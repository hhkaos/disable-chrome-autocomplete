const enabledToggle = document.getElementById("enabled-toggle");
const statusText = document.getElementById("status-text");
const addressAutofillSetting = chrome.privacy?.services?.autofillAddressEnabled;

function isAutofillDisabled(details) {
  return details.value === false;
}

function canControlSetting(details) {
  return (
    details.levelOfControl === "controllable_by_this_extension" ||
    details.levelOfControl === "controlled_by_this_extension"
  );
}

function getSettingDetails() {
  if (!addressAutofillSetting) {
    return Promise.reject(
      new Error("Chrome address autofill control is unavailable in this browser.")
    );
  }

  return new Promise((resolve, reject) => {
    addressAutofillSetting.get({}, (details) => {
      const { lastError } = chrome.runtime;

      if (lastError) {
        reject(new Error(lastError.message));
        return;
      }

      resolve(details);
    });
  });
}

function setAddressAutofillEnabled(value) {
  return new Promise((resolve, reject) => {
    addressAutofillSetting.set({ value }, () => {
      const { lastError } = chrome.runtime;

      if (lastError) {
        reject(new Error(lastError.message));
        return;
      }

      resolve();
    });
  });
}

function getStatusMessage(details) {
  if (details.levelOfControl === "not_controllable") {
    return "Chrome locked this setting, likely because of an enterprise policy.";
  }

  if (details.levelOfControl === "controlled_by_other_extensions") {
    return "Another extension is already controlling Chrome address autofill.";
  }

  return isAutofillDisabled(details)
    ? "Saved address suggestions are disabled in Chrome."
    : "Saved address suggestions are enabled in Chrome.";
}

function render(details) {
  enabledToggle.checked = isAutofillDisabled(details);
  enabledToggle.disabled = !canControlSetting(details);
  statusText.textContent = getStatusMessage(details);
}

async function refresh() {
  const details = await getSettingDetails();
  render(details);
}

function subscribeToChanges() {
  if (!addressAutofillSetting?.onChange) {
    return;
  }

  addressAutofillSetting.onChange.addListener((details) => {
    render(details);
  });
}

async function init() {
  subscribeToChanges();
  await refresh();
}

enabledToggle.addEventListener("change", async () => {
  enabledToggle.disabled = true;
  statusText.textContent = enabledToggle.checked
    ? "Disabling Chrome address autofill..."
    : "Enabling Chrome address autofill...";

  try {
    await setAddressAutofillEnabled(!enabledToggle.checked);
    await refresh();
  } catch (error) {
    statusText.textContent = error.message || "Could not update Chrome address autofill.";
    await refresh().catch(() => undefined);
  } finally {
    const details = await getSettingDetails().catch(() => null);

    if (details) {
      enabledToggle.disabled = !canControlSetting(details);
    }
  }
});

init().catch((error) => {
  enabledToggle.disabled = true;
  statusText.textContent = "Could not access Chrome address autofill.";
  console.error("Popup initialization failed", error);
});

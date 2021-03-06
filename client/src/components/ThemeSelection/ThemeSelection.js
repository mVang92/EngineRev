import React from "react";
import { defaults } from "../../assets/Defaults";

const ThemeSelection = props => {
  const {
    disableThemeToggleButton,
    saveThemeForUser,
    theme
  } = props;

  return (
    <div className="row">
      <div className="col-md-4 bottomMarginMobileDisplay">
        <label htmlFor={defaults.themeSelectionDropdown}><strong>Themes:</strong></label>
      </div>
      <div className="col-md-4 text-center bottomMarginMobileDisplay">
        <select
          id={defaults.themeSelectionDropdown}
          name={defaults.themeSelectionDropdown}
          defaultValue={theme}>
          <option value={defaults.engineRevTheme}>EngineRev</option>
          <option value={defaults.lightTheme}>Light</option>
          <option value={defaults.greyTheme}>Grey</option>
          <option value={defaults.darkTheme}>Dark</option>
          <option value={defaults.transparentLightTheme}>Transparent Light</option>
          <option value={defaults.transparentGreyTheme}>Transparent Grey</option>
          <option value={defaults.transparentDarkTheme}>Transparent Dark</option>
        </select>
      </div>
      <div className="col-md-4">
        <button
          id="applyThemeButton"
          title="Apply"
          type="button"
          onClick={() => saveThemeForUser()}
          disabled={disableThemeToggleButton}>
          Save
        </button>
      </div>
    </div>
  )
};

export default ThemeSelection;

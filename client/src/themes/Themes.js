import { defaults } from "../assets/Defaults";

export const themes = {
  engineRev: {
    theme: "EngineRev",
    themeAlternate: "engineRev",
    background: "engineRevThemeBackground",
    hr: "engineRevThemeHr",
    serviceLogs: "engineRevThemeServiceLogs",
    vehicleItemList: "engineRevThemeVehicleItemList",
    vehicleItemListFont: "engineRevThemeVehicleItemListFont",
    oneThread: "engineRevThemeOneThread",
    oneUpdate: "engineRevThemeOneUpdate",
    accountDetails: "engineRevThemeAccountDetails",
    aboutContainer: "engineRevAboutContainer",
    backgroundColor: "rgb(220, 220, 220)"
  },
  light: {
    theme: "Light",
    themeAlternate: "light",
    background: "lightThemeBackground",
    hr: "lightThemeHr",
    serviceLogs: "lightThemeServiceLogs",
    vehicleItemList: "lightThemeVehicleItemList",
    vehicleItemListFont: "lightThemeVehicleItemListFont",
    oneThread: "lightThemeOneThread",
    oneUpdate: "lightThemeOneUpdate",
    accountDetails: "lightThemeAccountDetails",
    aboutContainer: "lightThemeAboutContainer",
    backgroundColor: "rgb(245, 245, 245)"
  },
  grey: {
    theme: "Grey",
    themeAlternate: "grey",
    background: "greyThemeBackground",
    hr: "greyThemeHr",
    serviceLogs: "greyThemeServiceLogs",
    vehicleItemList: "greyThemeVehicleItemList",
    vehicleItemListFont: "greyThemeVehicleItemListFont",
    oneThread: "greyThemeOneThread",
    oneUpdate: "greyThemeOneUpdate",
    accountDetails: "greyThemeAccountDetails",
    aboutContainer: "greyThemeAboutContainer",
    backgroundColor: "rgb(112, 112, 112)"
  },
  dark: {
    theme: "Dark",
    themeAlternate: "dark",
    background: "darkThemeBackground",
    hr: "darkThemeHr",
    serviceLogs: "darkThemeServiceLogs",
    vehicleItemList: "darkThemeVehicleItemList",
    vehicleItemListFont: "darkThemeVehicleItemListFont",
    oneThread: "darkThemeOneThread",
    oneUpdate: "darkThemeOneUpdate",
    accountDetails: "darkThemeAccountDetails",
    aboutContainer: "darkThemeAboutContainer",
    backgroundColor: "rgb(16, 16, 16)"
  },
  transparentLight: {
    theme: "Transparent Light",
    themeAlternate: "transparentLight",
    background: "transparentLightThemeBackground",
    hr: "transparentLightThemeHr",
    serviceLogs: "transparentLightThemeServiceLogs",
    vehicleItemList: "transparentLightThemeVehicleItemList",
    vehicleItemListFont: "transparentLightThemeVehicleItemListFont",
    oneThread: "transparentLightThemeOneThread",
    oneUpdate: "transparentLightThemeOneUpdate",
    accountDetails: "transparentLightThemeAccountDetails",
    aboutContainer: "transparentLightThemeAboutContainer",
    backgroundColor: "rgb(235, 235, 235)"
  },
  transparentGrey: {
    theme: "Transparent Grey",
    themeAlternate: "transparentGrey",
    background: "transparentGreyThemeBackground",
    hr: "transparentGreyThemeHr",
    serviceLogs: "transparentGreyThemeServiceLogs",
    vehicleItemList: "transparentGreyThemeVehicleItemList",
    vehicleItemListFont: "transparentGreyThemeVehicleItemListFont",
    oneThread: "transparentGreyThemeOneThread",
    oneUpdate: "transparentGreyThemeOneUpdate",
    accountDetails: "transparentGreyThemeAccountDetails",
    aboutContainer: "transparentGreyThemeAboutContainer",
    backgroundColor: "rgb(112, 112, 112)"
  },
  transparentDark: {
    theme: "Transparent Dark",
    themeAlternate: "transparentDark",
    background: "transparentDarkThemeBackground",
    hr: "transparentDarkThemeHr",
    serviceLogs: "transparentDarkThemeServiceLogs",
    vehicleItemList: "transparentDarkThemeVehicleItemList",
    vehicleItemListFont: "transparentDarkThemeVehicleItemListFont",
    oneThread: "transparentDarkThemeOneThread",
    oneUpdate: "transparentDarkThemeOneUpdate",
    accountDetails: "transparentDarkThemeAccountDetails",
    aboutContainer: "transparentDarkThemeAboutContainer",
    backgroundColor: "rgb(16, 16, 16)"
  },
  determineTheme(theme) {
    let themeType;
    switch (theme) {
      case defaults.engineRevTheme:
        themeType = themes.engineRev;
        break;
      case defaults.lightTheme:
        themeType = themes.light;
        break;
      case defaults.greyTheme:
        themeType = themes.grey;
        break;
      case defaults.darkTheme:
        themeType = themes.dark;
        break;
      case defaults.transparentLightTheme:
        themeType = themes.transparentLight;
        break;
      case defaults.transparentGreyTheme:
        themeType = themes.transparentGrey;
        break;
      case defaults.transparentDarkTheme:
        themeType = themes.transparentDark;
        break;
      default:
        themeType = themes.engineRev;
    }
    return themeType;
  }
};

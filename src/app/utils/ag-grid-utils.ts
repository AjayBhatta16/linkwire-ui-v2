import { AutoSizeStrategy, ColDef, colorSchemeDarkBlue, themeQuartz } from "ag-grid-community";

export const DEFAULT_SIZE_STRATEGY: AutoSizeStrategy = {
    type: 'fitGridWidth',
};

export const DEFAULT_COL_DEF: ColDef = {
    contextMenuItems: ['copy', 'copyWithHeaders'],
}

export const DEFAULT_THEME = themeQuartz.withPart(colorSchemeDarkBlue);
import { convertDocxToPdfWithLibreOffice } from "./libreoffice";
import { convertPdfToDocxWithTextExtraction } from "./pdf-text";
import type { ConversionOptions, ConversionProvider } from "./provider";
export const localConversionProvider: ConversionProvider = {
  convertPdfToDocx: (inputPath, options) => convertPdfToDocxWithTextExtraction(inputPath, options.outputDir),
  convertDocxToPdf: (inputPath, options) => convertDocxToPdfWithLibreOffice(inputPath, options.outputDir),
};
export type { ConversionProvider, ConversionOptions } from "./provider";

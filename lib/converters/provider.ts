export type ConversionOptions = { outputDir: string };
export interface ConversionProvider { convertPdfToDocx(inputPath: string, options: ConversionOptions): Promise<string>; convertDocxToPdf(inputPath: string, options: ConversionOptions): Promise<string>; }

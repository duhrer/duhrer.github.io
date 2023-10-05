/** Exported memory */
export declare const memory: WebAssembly.Memory;
/** src/assembly/index/IMAGE_BUFFER_POINTER */
export declare const IMAGE_BUFFER_POINTER: {
  /** @type `i32` */
  get value(): number
};
/**
 * src/assembly/index/setDimensions
 * @param newWidth `i32`
 * @param newHeight `i32`
 */
export declare function setDimensions(newWidth: number, newHeight: number): void;
/**
 * src/assembly/index/addScanLines
 */
export declare function addScanLines(): void;
/**
 * src/assembly/index/applyVerticalHold
 */
export declare function applyVerticalHold(): void;
/**
 * src/assembly/index/combineWithRotatedSelf
 */
export declare function combineWithRotatedSelf(): void;
/**
 * src/assembly/index/combineWithMirroredSelf
 */
export declare function combineWithMirroredSelf(): void;

declare type EaseFun = (t: number, b: number, c: number, d: number) => number;

export default class Tween {
	static strongEaseOut: EaseFun;

	constructor(obj: unknown, prop: string, func: EaseFun, begin: number, finish: number, duration: number, suffixe?: unknown)
	playing(): boolean;
	start(): void;
	stop(): void;
	onMotionChanged: (event: unknown) => void;
	onMotionFinished: () => void;
}
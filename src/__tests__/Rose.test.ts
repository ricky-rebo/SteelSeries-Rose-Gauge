import { Rose } from "../index";

test("Wind Rose Gauge test", () => {
	const el = document.createElement("canvas");
	el.width = 20;
	el.height = 20;

	const rose = new Rose(el, {
		size: 20
	});

	expect(rose).toBeDefined();

	rose.setValue([1, 2, 3]);
	expect(rose.getValue()).toStrictEqual([1, 2, 3]);

	rose.setOdoValue(23);
	expect(rose.getOdoValue()).toBe(23);

	rose.setOdoValueAnimated(55, () => {
		expect(rose.getOdoValue).toBe(55);
	});
});
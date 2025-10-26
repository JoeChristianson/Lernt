export function assertDefinedVariable<T>(v: T, name = "value"): asserts v is Exclude<T, undefined> {
	if (v === undefined) throw new Error(`Missing dependency: ${name}`);
}

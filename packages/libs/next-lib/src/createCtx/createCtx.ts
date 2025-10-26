"use client";
import { createContext, useContext } from "react";

const createCtx = <A extends NonNullable<unknown> | null>(providerName: string) => {
	const ctx = createContext<A | undefined>(undefined);
	function useCtx(componentName: string) {
		const c = useContext(ctx);
		if (c === undefined) {
			throw new Error(
				`${providerName} does not wrap ${componentName}. Make sure you have the provider in the tree above this component.`,
			);
		}
		return c;
	}
	return [useCtx, ctx.Provider] as const;
};

export default createCtx;

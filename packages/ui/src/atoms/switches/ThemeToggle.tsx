// ThemeToggle.tsx
"use client";
import * as React from "react";

export function ThemeToggle() {
	const [dark, setDark] = React.useState(false);

	React.useEffect(() => {
		const el = document.documentElement;
		if (dark) el.classList.add("dark");
		else el.classList.remove("dark");
	}, [dark]);

	return (
		<button
			type="button"
			onClick={() => setDark((d) => !d)}
			className="rounded-md border px-3 py-1 text-sm"
		>
			Toggle {dark ? "Light" : "Dark"}
		</button>
	);
}

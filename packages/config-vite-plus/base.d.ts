import type { UserConfig } from "vite-plus";

export declare const lint: NonNullable<UserConfig["lint"]>;
export declare const fmt: NonNullable<UserConfig["fmt"]> & {
	ignorePatterns: string[];
};
export declare const staged: NonNullable<UserConfig["staged"]>;

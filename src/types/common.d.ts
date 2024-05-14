type ID = number | string

type CB<T extends [] = any[], R = void> = (...res: T) => R

declare const logLabel: (title: string, background?: string) => string[]

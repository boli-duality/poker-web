/** 判断泛型参数是否有传入值 */
type HasValue<T> = T extends never ? false : true

/** 深度设置只读 */
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] }
/** 将对象中除指定属性外的属性设置为只读 */
type ReadonlyOmit<T, K extends keyof T> = Readonly<Omit<T, K>> & Pick<T, K>
/** 将对象中的指定属性设置为只读 */
type ReadonlyPick<T, K extends keyof T> = Readonly<Pick<T, K>> & Omit<T, K>

type ReadonlyChildProps<T, K extends keyof T> = Omit<T, K> & { [P in K]: Readonly<T[P]> } // {cropper:{width:number,height:number}}
/** 将对象中的指定属性的指定值设置为只读 */
type ReadonlyChildPropsOmit<Parent, Child extends keyof Parent, Props extends keyof Parent[Child]> = Omit<Parent, Child> & { [K in Child]: ReadonlyOmit<Parent[K], Props> }

type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type PropsT<O, T = any> = { [P in keyof O]: T }

interface ObjectT<T = any> { [key: string | number]: T }

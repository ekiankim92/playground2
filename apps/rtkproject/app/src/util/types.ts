/**
 * @description
 * styled-components에 props를 넘겨서 style을 조정하게 될 경우, Transient props Issue 발생
 * * 이에 대해서 해당 함수를 통해, 외부(호출자)로부터 넘겨받는 props interface를 이용하여 $ 달러 사인 주입
 * * 이를 통하여 외부에서는 styled-components로 구성된 컴포넌트인지 아닌지 구분하지 않아도 됨
 *
 * @ref
 * * https://styled-components.com/docs/api#transient-props
 * * https://summerr.tistory.com/106
 *
 * @example
 * type PrefixedHwSwData = TypePropertyPrefixInjector<HwSwData, "$", "idx" | "name">;
 * -> idx와 name 키를 제외하고 $ 심볼이 붙게됨
 */
// prettier-ignore
export type TypePropertyPrefixInjector<T, P extends string = "$", ExcludedKeys extends keyof T = never> = {
    [K in keyof T as K extends string ? (K extends ExcludedKeys ? K : `${P}${K}`) : never]?: T[K];
   };

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/** 문자열 키를 가진 객체 타입 */
type StringKeyObject = { [key: string]: unknown };

/** 단일 문자열 변환 */
export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

export type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnake<U>}`
  : S;

/** 객체의 모든 키 변환 (재귀적) */
export type ConvertSnakeToCamel<T> =
  T extends Array<infer U>
    ? Array<ConvertSnakeToCamel<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeToCamel<K & string>]: T[K] extends object ? ConvertSnakeToCamel<T[K]> : T[K];
        }
      : T;

export type ConvertCamelToSnake<T> =
  T extends Array<infer U>
    ? Array<ConvertCamelToSnake<U>>
    : T extends object
      ? {
          [K in keyof T as CamelToSnake<K & string>]: T[K] extends object ? ConvertCamelToSnake<T[K]> : T[K];
        }
      : T;

/** 단일 객체의 snake_case 키를 camelCase로 변환하는 함수 */
export function toCamelCase<T extends object>(obj: T): ConvertSnakeToCamel<T> {
  if (!obj || typeof obj !== 'object') {
    return obj as ConvertSnakeToCamel<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' ? toCamelCase(item) : item,
    ) as unknown as ConvertSnakeToCamel<T>;
  }

  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj as StringKeyObject)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = typeof value === 'object' && value !== null ? toCamelCase(value) : value;
  }

  return result as ConvertSnakeToCamel<T>;
}

export function convertArrayToCamelCase<T extends object>(arr: T[]): ConvertSnakeToCamel<T>[] {
  return arr.map((item) => toCamelCase<T>(item));
}

/** 단일 객체의 camelCase 키를 snake_case로 변환하는 함수 */
export function toSnakeCase<T extends object>(obj: T): ConvertCamelToSnake<T> {
  if (!obj || typeof obj !== 'object') {
    return obj as ConvertCamelToSnake<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' ? toSnakeCase(item) : item,
    ) as unknown as ConvertCamelToSnake<T>;
  }

  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj as StringKeyObject)) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[snakeKey] = typeof value === 'object' && value !== null ? toSnakeCase(value) : value;
  }

  return result as ConvertCamelToSnake<T>;
}

export function convertArrayToSnakeCase<T extends object>(arr: T[]): ConvertCamelToSnake<T>[] {
  return arr.map((item) => toSnakeCase<T>(item));
}

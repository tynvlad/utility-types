interface Some {
  status: string[];
  test: number;
}

interface User {
  status: string;
  test: number;
}

interface Message {
  id: string;
  user: User;
  date: Date;
  hello: string;
}

interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    messages: Message[];
  };
}

/** override types for all fields */
type OverrideTypes<T, NewType> = {
  [K in keyof T]: T[K] extends object ? OverrideTypes<T[K], NewType> : NewType;
};

const over: OverrideTypes<Some, Date> = {
  status: [new Date()],
  test: new Date(),
};

/** output fields protocol */
type IncludedFields<Entity, Prefix extends string = ""> = {
  [Key in keyof Entity]: Key extends string | number
      ? Entity[Key] extends (infer U)[]
          ? `${Prefix}${Key}` | `${IncludedFields<U, `${Prefix}${Key}.`>}`
          : Entity[Key] extends object
          ? Entity[Key] extends (...arg: any) => any
              ? never
              : `${Prefix}${Key}` | `${IncludedFields<Entity[Key], `${Prefix}${Key}.`>}`
          : `${Prefix}${Key}`
      : never;
}[keyof Entity];

type GetArrayType<T> = T extends (infer U)[] ? U : never;
type SomeT<T> =  T extends string | number ? T : never;

/** @example "-message.id" */
type ExcludedFields<T> = `-${IncludedFields<T>}`;


type OutputFields<T> = ExcludedFields<T>[] | IncludedFields<T>[]

const some: OutputFields<Person> = ["address.messages.user.status", "address.messages.user.status"];
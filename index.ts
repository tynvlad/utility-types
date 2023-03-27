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
    messages: Message;
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
type IncludedOutputFields<T, Prefix extends string = ""> = {
  [K in keyof T]: K extends string | number
    ? T[K] extends object
      ? `${IncludedOutputFields<T[K], `${Prefix}${K}.`>}`
      : `${Prefix}${K}`
    : never;
}[keyof T];

type ExcludedOutputFields<T> = `-${IncludedOutputFields<T>}`;

/** TODO array not support */
type OutputFields<T> = ExcludedOutputFields<T> | IncludedOutputFields<T>;

const some: IncludedOutputFields<Person> = "address.messages.user.status";

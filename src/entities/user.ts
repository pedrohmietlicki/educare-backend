export class User {
  id: string;
  name: string;
  email: string;

  constructor({
    id,
    name,
    email,
  }: {
    id: string;
    name: string;
    email: string;
  }) {
    this.email = email;
    this.name = name;
    this.id = id;
  }
}

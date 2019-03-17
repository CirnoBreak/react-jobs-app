export class CreateUserDto {
  readonly _id?: string;
  readonly user: string;
  readonly pwd: string;
  readonly type: string;
  readonly salt?: string;
  readonly avatar?: string;
  readonly desc?: string;
  readonly position?: string;
  readonly company?: string;
  readonly money?: string;
}
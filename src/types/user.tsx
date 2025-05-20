export default interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  phoneNumber?: string | null;
  created_at: Date;
  updated_at: Date;
}

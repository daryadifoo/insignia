import { IsEmail, ValidateIf } from 'class-validator';

export class CreateContactDto {
    @IsEmail()
    @ValidateIf(e => e.email !== '')
    @ValidateIf(e => e.email !== null)
    email: string;
}
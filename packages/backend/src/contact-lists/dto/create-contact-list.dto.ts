import { IsNotEmpty } from 'class-validator';

export class CreateContactListDto {
    @IsNotEmpty()
    contactId: string;

    @IsNotEmpty()
    contactGroupId: string;
}

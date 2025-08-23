export class CreateExperienceDto {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

export class UpdateExperienceDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

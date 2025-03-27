import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({ description: 'User biography', example: 'A passionate developer', nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'User location', example: 'New York', nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'User phone number', example: '+123456789', nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'http://example.com/profile.jpg', nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ description: 'User date of birth', example: '2000-01-01', nullable: true })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @ApiProperty({ description: 'User gender', example: 'Male', nullable: true })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ description: 'User education', example: 'Bachelor in Computer Science', nullable: true })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiProperty({ description: 'User occupation', example: 'Software Developer', nullable: true })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({ description: 'User interests', example: 'Coding, Music, Reading', nullable: true })
  @IsOptional()
  @IsString()
  interests?: string;

  @ApiProperty({ description: 'User language', example: 'English', nullable: true })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ description: 'Total learning hours of the user', example: 120, default: 0 })
  totalLearningHours: number;

  @ApiProperty({ description: 'Total courses completed by the user', example: 5, default: 0 })
  totalCoursesCompleted: number;
}

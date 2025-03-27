import { ApiProperty } from '@nestjs/swagger';
import { Achievement } from '../../achievements/entities/achievement.entity';
import { UserProfileDto } from './user-profile.entity';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: ['student'] })
  roles: string[];

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ type: UserProfileDto })
  profile: UserProfileDto;

  @ApiProperty({ type: [Achievement], description: 'List of achievements associated with the user' })
  achievements: Achievement[];

  @ApiProperty({ example: '2025-03-27T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-03-27T12:00:00Z' })
  updatedAt: Date;
}

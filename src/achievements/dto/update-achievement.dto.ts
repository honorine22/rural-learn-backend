import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class Achievement {
  @ApiProperty({ description: 'Unique identifier for the achievement', example: 1 })
  id: number;

  // @ApiProperty({ description: 'User associated with the achievement', type: User })
  // user: User;

  // @ApiProperty({ description: 'Type of the achievement', type: AchievementType })
  // type: AchievementType;

  @ApiProperty({ description: 'Additional data associated with the achievement', nullable: true })
  data: any;

  @ApiProperty({ description: 'Date when the achievement was created', example: '2025-03-27T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the achievement was last updated', example: '2025-03-27T12:00:00Z' })
  updatedAt: Date;
}

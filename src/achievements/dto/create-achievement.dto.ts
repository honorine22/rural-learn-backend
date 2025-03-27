import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class AchievementTypeDTO {
  @ApiProperty({ description: 'Unique identifier for the achievement type', example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Unique code for the achievement type', example: 'ACHV001' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Name of the achievement type', example: 'Master Coder' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the achievement type', example: 'Awarded for mastering coding skills' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Icon associated with the achievement type', example: 'icon.png', nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'Badge image associated with the achievement type', example: 'badge.png', nullable: true })
  @IsOptional()
  @IsString()
  badgeImage?: string;

  @ApiProperty({ description: 'Trigger event for earning the achievement', example: 'completed_task', nullable: true })
  @IsOptional()
  @IsString()
  triggerEvent?: string;

  @ApiProperty({ description: 'Points associated with the achievement', example: 100, default: 0 })
  @IsInt()
  @IsPositive()
  points: number;

  @ApiProperty({ description: 'Date the achievement type was created', example: '2025-03-27T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Date the achievement type was last updated', example: '2025-03-27T12:00:00Z' })
  updatedAt: Date;
}

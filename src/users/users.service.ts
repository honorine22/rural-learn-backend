import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
  
    // Fetch users with pagination
    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      include: {
        profile: true, // Including profile data
      },
    });
  
    // Get the total number of users in the database
    const total = await this.prisma.user.count();
  
    return {
      data: users,
      meta: {
        total,  // Total number of users
        page,   // Current page
        limit,  // Limit per page
        totalPages: Math.ceil(total / limit), // Total pages
      },
    };
  }
  

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { 
        id: true,
        email: true,
        name: true,
        password: true,
        roles: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id); // Ensure user exists before deletion
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    await this.prisma.user.delete({
      where: { id },
    });
  
    return { message: `User with ID ${id} successfully deleted` };
  }  
}

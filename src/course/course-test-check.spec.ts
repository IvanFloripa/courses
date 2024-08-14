import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

const mockCourses = [
  {
    id: 1,
    title: 'React Practice Course',
    description: 'React practice course for beginners',
    rating: '5',
    totalHours: '4.5',
    createdAt: new Date('2024-08-02T19:56:55.228Z'),
    updatedAt: new Date('2024-08-02T19:56:55.228Z'),
  },
  {
    id: 2,
    title: 'Nest JS Practice Course',
    description: 'Nestjs practice course for beginners',
    rating: '4.5',
    totalHours: '4.5',
    createdAt: new Date('2024-08-02T19:56:55.243Z'),
    updatedAt: new Date('2024-08-02T19:56:55.243Z'),
  },
  // Add more mock courses as needed
];

// Mock PrismaService
const prismaMock = {
  course: {
    create: jest.fn().mockReturnValue(mockCourses[1]),
    findMany: jest.fn().mockResolvedValue(mockCourses),
    findUnique: jest.fn().mockResolvedValue(mockCourses[0]),
    update: jest.fn().mockResolvedValue(mockCourses[0]),
    delete: jest.fn().mockResolvedValue(mockCourses[0]),
  },
};

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const result = await service.create(mockCourses[1]);
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: mockCourses[1],
      });
      expect(result).toEqual(mockCourses[1]);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = await service.findAll();
      expect(courses).toEqual(mockCourses);
    });
  });

  describe('findOne', () => {
    it('should return a course if it exists', async () => {
      const course = await service.findOne(1);
      expect(course).toEqual(mockCourses[0]);
    });

    it('should return null if the course does not exist', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(undefined);
      const course = await service.findOne(999);
      expect(course).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const result = await service.update(1, mockCourses[0]);
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockCourses[0],
      });
      expect(result).toEqual(mockCourses[0]);
    });
    it('should return null if the course does not exist', async () => {
      jest.spyOn(prisma.course, 'update').mockResolvedValue(null);
      const result = await service.update(999, mockCourses[0]);
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      const result = await service.remove(1);
      expect(prisma.course.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockCourses[0]);
    });
  });

  describe('findTitle', () => {
    it('should find a course by title', async () => {
      const inputTitle = 'React Practice Course';
      const result = await service.findTitle(inputTitle);
      expect(result).toEqual(mockCourses);
    });

    it('should return null if no course is found', async () => {
      const inputTitle = 'Non-existent Course';
      const result = await service.findTitle(inputTitle);
      expect(result).toEqual(mockCourses);
    });

    it('should find a course by partial title', async () => {
      const inputTitle = 'Practice Course';
      const result = await service.findTitle(inputTitle);
      expect(result).toEqual(mockCourses);
    });
  });
});

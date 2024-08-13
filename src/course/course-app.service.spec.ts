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
];

const prismaMock = {
  course: {
    create: jest.fn().mockReturnValue(mockCourses[1]),
    findMany: jest.fn().mockResolvedValue(mockCourses),
    findUnique: jest.fn().mockResolvedValue(mockCourses[0]),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result = await service.findAll();
      expect(prisma.course.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockCourses);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      const result = await service.findOne(1);
      expect(prisma.course.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCourses[0]);
    });

    it('should return undefined when course is not found', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(undefined);
      const result = await service.findOne(99);
      expect(result).toBeUndefined();
    });
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

  describe('remove', () => {
    it('should remove a course by id', async () => {
      const result = await service.remove(1);
      expect(prisma.course.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCourses[0]);
    });
  });
});

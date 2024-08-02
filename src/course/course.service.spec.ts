import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

const fakeCourses = [
  {
    id: 12,
    description: 'Begin course',
    rating: '5',
    title: 'Nestjs',
    totalHours: '12',
    createdAt: new Date('2024-03-18T20:23:59.020Z'),
    updatedAt: new Date('2024-03-18T20:23:59.020Z'),
  },
  {
    id: 14,
    description: 'test',
    rating: '5',
    title: 'test',
    totalHours: '12',
    createdAt: new Date('2024-03-18T20:32:03.344Z'),
    updatedAt: new Date('2024-03-18T20:32:03.344Z'),
  },
  {
    id: 33,
    description: 'Unit Test',
    rating: '5',
    title: 'Node Js',
    totalHours: '20',
    createdAt: new Date('2024-03-18T20:33:21.623Z'),
    updatedAt: new Date('2024-03-18T20:33:21.623Z'),
  },
];

const prismaMock = {
  course: {
    create: jest.fn().mockReturnValue(fakeCourses[0]),
    findMany: jest.fn().mockResolvedValue(fakeCourses),
    findUnique: jest.fn().mockResolvedValue(fakeCourses[1]),
    update: jest.fn().mockResolvedValue(fakeCourses[0]),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let courseService: CourseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    courseService = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of posts`, async () => {
      const response = await courseService.findAll();
      expect(response).toEqual(fakeCourses);
      expect(prisma.course.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.course.findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it('should return find by user', async () => {
      const result = await courseService.findOne(14);
      expect(result).toEqual(fakeCourses[1]);
      expect(prisma.course.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.course.findUnique).toHaveBeenCalledWith({
        where: { id: 14 },
      });
    });

    it(`should return nothing when course is not found`, async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(undefined);

      const response = await courseService.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.course.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.course.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it(`should create a new post`, async () => {
      const response = await courseService.create(fakeCourses[0]);
      expect(response).toBe(fakeCourses[0]);
      expect(prisma.course.create).toHaveBeenCalledTimes(1);
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: fakeCourses[0],
      });
    });
  });
});

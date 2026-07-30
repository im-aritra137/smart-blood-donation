import { prisma } from '../database/prisma.js';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userSignUp = async (req, res) => {
  const userCreateSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().optional(),
    password: z.string().min(6),
    bloodGroup: z.enum([
      'A_POSITIVE',
      'A_NEGATIVE',
      'B_POSITIVE',
      'B_NEGATIVE',
      'AB_POSITIVE',
      'AB_NEGATIVE',
      'O_POSITIVE',
      'O_NEGATIVE',
    ]).optional(),
    role: z.enum(['DONOR', 'RECEIVER']).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  });

  const { success, data, error } = userCreateSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return res.status(409).json({ status: 'error', message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const name = data.name;

  let createdUser;

  try {
    createdUser = await prisma.user.create({
      data: {
        name,
        email: data.email,
        phone: data.phone,
        password: passwordHash,
        bloodGroup: data.bloodGroup ?? 'O_POSITIVE',
        role: data.role ?? 'DONOR',
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const fields = error.meta?.target ? error.meta.target.join(', ') : 'field';
      return res.status(409).json({ status: 'error', message: `${fields} already registered` });
    }

    console.error(error);
    return res.status(500).json({ status: 'Error', message: 'Something went wrong!' });
  }

  const accessToken = jwt.sign({ sub: createdUser.id, role: createdUser.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    },
    accessToken,
  });
};

export const userSignIn = async (req, res) => {
  const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { success, data, error } = userSignInSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
  }

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ status: 'error', message: 'Invalid password' });
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({
    status: 'success',
    message: 'User signed in successfully',
    accessToken,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.json({
    status: 'success',
    message: 'User fetched successfully',
    data: { user },
  });
};
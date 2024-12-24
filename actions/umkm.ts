"use server";

import prisma from "@/lib/prisma";

interface CreateUMKMValues {
    id: string;
    name: string;
    description: string;
    photo: string[];
  }

  export const createUMKM = async (values: CreateUMKMValues) => {
    try {
      const umkm = await prisma.umkm.create({
        data: values,
      });
      console.log("UMKM Created:", umkm);
      return { success: true, data: umkm };
    } catch (error) {
      console.error("Error creating UMKM:", error);
      return { success: false, error: "Failed to create UMKM" };
    }
  };

  export const getAllUMKM = async () => {
    try {
      const umkms = await prisma.umkm.findMany();
      return { success: true, data: umkms };
    } catch (error) {
      console.error("Error fetching UMKM:", error);
      return { success: false, error: "Failed to fetch UMKM" };
    }
  };
  
  export const getUMKMById = async (id: string) => {
    try {
      const umkm = await prisma.umkm.findUnique({
        where: { id },
      });
  
      if (!umkm) {
        return { success: false, error: "UMKM not found" };
      }
  
      return { success: true, data: umkm };
    } catch (error) {
      console.error("Error fetching UMKM by ID:", error);
      return { success: false, error: "Failed to fetch UMKM" };
    }
  };

  interface UpdateUMKMValues {
    id: string;
    name: string;
    description: string;
    photo: string[];
  }

  export const updateUMKM = async (values: UpdateUMKMValues) => {
    try {
      const { id, ...data } = values;
  
      const updatedUMKM = await prisma.umkm.update({
        where: { id },
        data,
      });
  
      return { success: true, data: updatedUMKM };
    } catch (error) {
      console.error("Error updating UMKM:", error);
      return { success: false, error: "Failed to update UMKM" };
    }
  };

  export const deleteUMKM = async (id: string) => {
    try {
      const deletedUMKM = await prisma.umkm.delete({
        where: { id },
      });
  
      return { success: true, data: deletedUMKM };
    } catch (error) {
      console.error("Error deleting UMKM:", error);
      return { success: false, error: "Failed to delete UMKM" };
    }
  };
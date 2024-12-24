
"use server";

import prisma from "@/lib/prisma";

interface CreateWisataValues {
  name: string;
  description: string;
  location: string;
  photo: string[];
}

export const createWisata = async (values: CreateWisataValues) => {
  try {
    const wisata = await prisma.wisata.create({
      data: values,
    });
    console.log("Wisata Created:", wisata);
    return { success: true, data: wisata };
  } catch (error) {
    console.error("Error creating Wisata:", error);
    return { success: false, error: "Failed to create Wisata" };
  }
};

export const getAllWisata = async () => {
  try {
    const wisataList = await prisma.wisata.findMany();
    return { success: true, data: wisataList };
  } catch (error) {
    console.error("Error fetching Wisata:", error);
    return { success: false, error: "Failed to fetch Wisata" };
  }
};


export const getWisataById = async (id: string) => {
  try {
    const wisata = await prisma.wisata.findUnique({
      where: { id },
    });

    if (!wisata) {
      return { success: false, error: "Wisata not found" };
    }

    return { success: true, data: wisata };
  } catch (error) {
    console.error("Error fetching Wisata by ID:", error);
    return { success: false, error: "Failed to fetch Wisata" };
  }
};

interface UpdateWisataValues {
  id: string;
  name?: string;
  description?: string;
  location?: string;
  photo?: string[];
}

export const updateWisata = async (values: UpdateWisataValues) => {
  try {
    const { id, ...data } = values;

    const updatedWisata = await prisma.wisata.update({
      where: { id },
      data,
    });

    return { success: true, data: updatedWisata };
  } catch (error) {
    console.error("Error updating Wisata:", error);
    return { success: false, error: "Failed to update Wisata" };
  }
};

export const deleteWisata = async (id: string) => {
    try {
      const deletedWisata = await prisma.wisata.delete({
        where: { id },
      });
  
      return { success: true, data: deletedWisata };
    } catch (error) {
      console.error("Error deleting Wisata:", error);
      return { success: false, error: "Failed to delete Wisata" };
    }
  };
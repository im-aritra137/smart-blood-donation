import { prisma } from "../database/prisma.js";

export const createEmergencyRequest = async (req, res) => {
  try {

    const {
      bloodGroup,
      latitude,
      longitude,
      urgency
    } = req.body;

    const request = await prisma.emergencyRequest.create({

      data: {

        bloodGroup,

        latitude,
        longitude,

        urgency,

        requesterId: req.user.id

      }

    });

    res.status(201).json({

      message: "Emergency request created successfully",

      request

    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Failed to create emergency request"
    });

  }
};

export const getAllEmergencyRequests = async (req,res)=>{

  try{

    const requests = await prisma.emergencyRequest.findMany({

      include:{
        requester:{
          select:{
            id:true,
            name:true,
            phone:true,
            bloodGroup:true
          }
        }
      },

      orderBy:{
        createdAt:"desc"
      }

    });

    res.json(requests);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Failed to fetch requests"
    });

  }

};

export const getEmergencyRequestById = async(req,res)=>{

  try{

    const request = await prisma.emergencyRequest.findUnique({

      where:{
        id:req.params.id
      },

      include:{
        requester:true
      }

    });

    if(!request){

      return res.status(404).json({
        message:"Request not found"
      });

    }

    res.json(request);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server error"
    });

  }

};

export const updateEmergencyStatus = async(req,res)=>{

  try{

    const {status}=req.body;

    const request = await prisma.emergencyRequest.update({

      where:{
        id:req.params.id
      },

      data:{
        status
      }

    });

    res.json({

      message:"Request status updated",

      request

    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server error"
    });

  }

};

export const deleteEmergencyRequest = async(req,res)=>{

  try{

    await prisma.emergencyRequest.delete({

      where:{
        id:req.params.id
      }

    });

    res.json({

      message:"Request deleted"

    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server error"
    });

  }

};

export const findMatchingDonors = async (req, res) => {

  try {

    const { id } = req.params;

    // Find emergency request
    const emergencyRequest = await prisma.emergencyRequest.findUnique({

      where: {
        id
      }

    });

    if (!emergencyRequest) {

      return res.status(404).json({
        message: "Emergency request not found"
      });

    }

    // Find matching donors
    const donors = await prisma.user.findMany({

      where: {

        role: "DONOR",

        bloodGroup: emergencyRequest.bloodGroup,

        isAvailable: true

      },

      select: {

        id: true,

        name: true,

        phone: true,

        bloodGroup: true,

        latitude: true,

        longitude: true

      }

    });

    res.json({

      requestId: emergencyRequest.id,

      requiredBloodGroup: emergencyRequest.bloodGroup,

      totalMatches: donors.length,

      donors

    });

  } catch(error) {

    console.log(error);

    res.status(500).json({
      message:"Failed to find matching donors"
    });

  }

};

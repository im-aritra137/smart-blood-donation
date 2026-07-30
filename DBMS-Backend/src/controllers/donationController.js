import { prisma } from "../database/prisma.js";

export const createDonation = async (req, res) => {

    try {

        const { requestId } = req.body;

        // Check emergency request exists
        const request = await prisma.emergencyRequest.findUnique({
            where:{
                id: requestId
            }
        });

        if(!request){

            return res.status(404).json({
                message:"Emergency request not found"
            });

        }

        // Create donation record

        const donation = await prisma.donation.create({

            data:{

                donorId:req.user.id,

                requestId

            }

        });

        res.status(201).json({

            message:"Donation accepted successfully",

            donation

        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to create donation"
        });

    }

};

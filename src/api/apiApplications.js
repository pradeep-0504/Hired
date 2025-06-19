import SupabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token,_,jobData) {
    const supabase =await SupabaseClient(token);

    const random=Math.floor(Math.random() * 900000);
    const fileName=`resume-${random}-${jobData?.candidate_id}`;

    const{error: storageError} =await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume );

    if(storageError){
        console.error("Error fetching companies:",storageError);
        return null;
    }

    const resume=`${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`

    const {data,error}=await supabase.from("applications").insert([
        {
            ...jobData,
            resume
        }
    ]);
    if(error){
        console.log("Error submitting application:",error);
    }
    return data;
}

export async function updateApplicationStatus(token,{job_id},status) {
    const supabase =await SupabaseClient(token);

    const{data,error}=await supabase.from("applications")
    .update({status})
    .eq("job_id", job_id)
    .select();

    if(error || data.length === 0){
        console.error("Error updating Application status:",error);
        return null;
    }
    return data;
}

export async function getApplications(token,{user_id}) {
    const supabase =await SupabaseClient(token);

    const{data,error}=await supabase
    .from("applications")
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id);

    if(error){
        console.error("Error Fetching Applications:",error);
        return null;
    }
    return data;
}
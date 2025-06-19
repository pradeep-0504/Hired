import SupabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase =await SupabaseClient(token);

    const{data,error}=await supabase.from("companies").select("*");

    if(error){
        console.error("Error fetching companies:",error);
        return null;
    }
    console.log(data);
    return data;
}

export async function addNewCompany(token,_,companyData) {
    const supabase =await SupabaseClient(token);

    const random=Math.floor(Math.random() * 900000);
        const fileName=`logo-${random}-${companyData.name}`;
    
        const{error: storageError} =await supabase.storage
        .from("company-logo")
        .upload(fileName, companyData.logo );
    
        if(storageError){
            console.error("Error uploading company logo:",storageError);
            return null;
        }
    
        const logo_url=`${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`
        // https://vjstczlzdtklpozojiyz.supabase.co/storage/v1/object/public/company-logo//logo-508704-Hired

    const{data,error}=await supabase.from("companies")
    .insert([
        {
            name:companyData.name,
            logo_url,
        }
    ])
    .select();

    if(error){
        console.error("Error Submitting companies:",error);
        return null;
    }
    console.log(data);
    return data;
}
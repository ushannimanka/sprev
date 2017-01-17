package com.springapp.mvc.DataAccessObjects;

import com.springapp.mvc.helpers.Jobs;

import java.util.ArrayList;
import java.util.List;

public interface JobLogDAO {
    public boolean createJob(String timestamp, String description);
   public ArrayList<Jobs> getLastEntry();
    public boolean createJobLog(String timestamp, Integer jobID, String spID, Double amount, String description);
    public boolean balanceLog(Integer jobID,String timestamp, String spID,String spName,Double currentBalance);
}

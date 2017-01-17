package com.springapp.mvc.DataAccessObjects;

import com.springapp.mvc.helpers.Jobs;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.util.ArrayList;


public class JobLogDAOImpl  implements  JobLogDAO {

    private DataSource dataSource1;
    private JdbcTemplate jdbcTemplate;

    private DriverManagerDataSource dataSource;


    public boolean createJob(String timestamp, String description) {
        String sql = "INSERT INTO tbl_jobs ( TIMESTAMP, DESCRIPTION) VALUES ( ?, ?)";
    try {


    int effectedRows=jdbcTemplate.update(sql, timestamp, description);

    return effectedRows>0;
    } catch (Exception ex) {

        System.out.println(ex.getMessage());
        return false;
    }

    }


  public ArrayList<Jobs> getLastEntry() {
        String sql = "SELECT * FROM  tbl_jobs WHERE   JOB_ID = (SELECT MAX(JOB_ID)  FROM tbl_jobs)";
        try {


            ArrayList<Jobs> job = (ArrayList<Jobs>) jdbcTemplate.query(sql,
                    new BeanPropertyRowMapper(Jobs.class));

            return job;
        } catch (Exception e) {

        System.out.print(e.getMessage());
         return null;
        }
    }



    public boolean createJobLog(String timestamp, Integer jobID, String spID, Double amount, String description) {


        String sql = "INSERT INTO jobs_log( TIMESTAMP, JOB_ID, SP_ID, AMOUNT, DESCRIPTION) VALUES (?,?,?,?,?)";

        try {
           int effectedRows= jdbcTemplate.update(sql, timestamp, jobID, spID, amount, description);

            return effectedRows>0;
        } catch (Exception e) {
            System.out.print(e.getMessage());
            return false;
        }
    }


    public boolean balanceLog(Integer jobID,String timestamp, String spID,String spName,Double currentBalance){

        String sql= "INSERT INTO balance_history( JOB_ID, SP_ID, TIMESTAMP, SP_NAME, BALANCE) VALUES (?,?,?,?,?)";

        try{

            int effectedRows= jdbcTemplate.update(sql, jobID,spID,timestamp,spName,currentBalance);

            return effectedRows>0;
        } catch (Exception e) {
            System.out.print(e.getMessage());
            return false;
        }
    }

    public void setDataSource(DriverManagerDataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public DriverManagerDataSource getDataSource() {
        return dataSource;
    }
}
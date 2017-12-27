package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import play.Logger;
import play.libs.WS;

public class DatabaseUtils {
	private final static String SERVER = "";
	private final static String DATABASE = "";
	private final static String PASSWORD = "";
	private final static String USER = "";
	private static String URL = "jdbc:postgresql://"+SERVER+":5432/"+DATABASE+"?user="+USER+"&password="+PASSWORD;

	public static Connection getConnection(){
		try {
			return DriverManager.getConnection(URL);
		} catch (SQLException e) {
			Logger.info("error making connection!!! %s", e);
		}
		return null;
	}



}
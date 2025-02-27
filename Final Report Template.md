
# Connecting to GitHub
To access the source code and version control:  

1. **Install Git**:  
   - On Windows: [Download Git](https://git-scm.com/downloads)  
   - On macOS/Linux:  
     ```sh
     sudo apt install git  # Ubuntu/Debian
     brew install git      # macOS
     ```  

2. **Clone the Repository**:  
   ```sh
   git clone https://github.com/Jaren-McLaughlin/RecipeDB
   ```  

3. **Set Up GitHub Authentication**:  
   - **SSH Method**: Generate an SSH key and add it to your GitHub account:  
     ```sh
     ssh-keygen -t ed25519 -C "your_email@example.com"
     eval "$(ssh-agent -s)"
     ssh-add ~/.ssh/id_ed25519
     ```  
     Copy the public key using:  
     ```sh
     cat ~/.ssh/id_ed25519.pub
     ```  
     Then add it to your GitHub SSH keys.  

   - **HTTPS Method**: Use a personal access token for authentication.  

---


# Software and DB Connection Documentation

## Overview
This document provides information about the software used and the steps to connect to the database, run the schema script, and manage the system.

---

## Software Used
- **MySQL** – Database management system  
- **OpenVPN** – Secure connection to the network  
- **SSH** – Secure shell access to the database server  
- **GitHub** – Version control and source code repository  

---

## Setting Up OpenVPN  
To connect to the DB server, you must first set up an OpenVPN connection. Follow these steps:

1. Install OpenVPN:
   - On Windows: Download and install from [https://openvpn.net](https://openvpn.net)
   - On macOS/Linux: Use a package manager (`brew install openvpn` or `sudo apt install openvpn`)

2. Obtain the `.ovpn` configuration file and place it in the OpenVPN configuration directory. You can also try to double click the file and see if OpenVPN will automatically add it to the connections list.

3. Connect to the VPN (Linux):
   ```sh
   sudo openvpn --config path/to/your/config.ovpn
   ```

---

## Connecting to the Database Server via SSH  
Once connected to the VPN, use SSH to access the database server:

```sh
ssh TeamNameHere@172.16.33.6
```

---

## Accessing MySQL Database  
After connecting via SSH:

```sh
mysql -u TeamNameHere -p
```

Enter the password when prompted.  

---

## Running the Schema Script  
To set up the database schema:

1. Upload your schema script to the server or place it in the accessible directory.
2. From the MySQL prompt, run:

```sql
SOURCE /path/to/schema.sql;
```

---

## Notes  
- Ensure the VPN connection is active before attempting to SSH.
- Make sure MySQL is installed on the server and running.

import React from "react";

export default function company_profile() {
  return (
    <div className="card">
      <table class="table ">
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>admin</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>softronix.it@gmail.com</td>
          </tr>
          <tr>
            <th scope="row">First Name </th>
            <td>Rokonuzzaman</td>
          </tr>

          <tr>
            <th scope="row">Last Name </th>
            <td>Rony</td>
          </tr>
          <tr>
            <th scope="row">Gender</th>
            <td>Male</td>
          </tr>
          <tr>
            <th scope="row">Phone</th>
            <td>01953386061</td>
          </tr>
          <tr>
            <th scope="row">Group</th>
            <td>
              <span className="badge badge-primary">Administrator</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

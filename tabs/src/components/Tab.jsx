import { Box, Table } from "@fluentui/react-northstar";
import React from "react";
import { useState } from "react";


export default function Tab() {

  const url = "https://api.coindesk.com/v1/bpi/currentprice.json"

  const style = {
    formStyle: { textAlign: "center"},
    inputStyle: { marginLeft: "10" }
  }

  // 'setJson' is used to set value in a 'json'
  const [json, setJson] = useState({ DataisLoaded: true })

  function getBTCPrice() {
    setJson({ DataisLoaded: false })
    fetch(
      url)
      .then((res) => res.json())
      .then((json) => {
        setJson({
          data: json,
          DataisLoaded: true
        });

      })
  }

  return (
    <Box
    >
    <div style={{height: "100%"}}>
      <form style={style.formStyle}>
        <label for="name">Url:</label>
        <input style={style.inputStyle} id="name" placeholder="Enter something" type="text" value={url} name="name" />
        <button style={style.inputStyle} type="submit" value="Submit" onClick={getBTCPrice}>
          Fetch
        </button>
        <div style={{ marginTop: "10" }}>
          {
            !json.DataisLoaded ? "Loading..." : json.data !== undefined ? "Disclaimer: " + json.data?.disclaimer : ""
          }

          <table style={{width: "300", margin: "auto", marginTop: "20"}}>
            <tr>
              {json.data !== undefined ? Object.entries(json.data.bpi).map(([item1, item2]) => {
                return (
                  <th>
                    {
                      item1
                    }
                  </th>
                )

              }) : ""
              }
            </tr>
            <tr>
            {

              json.data !== undefined ? Object.entries(json.data.bpi).map(([item1, item2]) => {

                return (
                  <td>
                    {
                      item2.rate
                    }
                  </td>
                )

              }) : ""

            }
            </tr>
          </table>

        </div>
      </form>
    </div>
    </Box>
  );
}

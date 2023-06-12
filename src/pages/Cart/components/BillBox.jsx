import { Group, Stack, Table, Text } from '@mantine/core'
import React from 'react'

const BillBox = ({totalValue,items,takeOutCharges}) => {
  return (
    <>
    <Stack spacing={0} style={{width:'100%',background: '#fff',padding: "15px 10px"}} align='center'>
        <Table verticalSpacing={'xs'} horizontalSpacing={'lg'}>
          <thead>
            <tr>
              <th>Item</th>
              <th>QTY</th>
              <th>PerPrice</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              items?.map((item,i) => (
                <tr key={i}>
                  <td><Text transform={'capitalize'} >{item?.itemName}</Text></td>
                  <td>{item?.qty}</td>
                  <td>{item?.perPrice} INR</td>
                  <td>{item?.qty*item?.perPrice} INR</td>
                </tr>
              ))
            }
            {
                  takeOutCharges ? (
                    <tr>
                      <td><Text fz={12} color={'red'} fw={600} transform={'capitalize'} >Charges</Text></td>
                      <td></td>
                      <td></td>
                      <td><Text>{`${takeOutCharges}`} INR</Text></td>
                  </tr>
                  ) : <></>
            }
          </tbody>
          <tfoot>
            <tr>
              <th><Text fz={16} fw={600}>Total</Text></th>
              <th></th>
              <th></th>
              <th><Text fz={16} fw={600}>{`₹${totalValue+takeOutCharges}`}</Text></th>
            </tr>
          </tfoot>
      </Table>
    </Stack>
    </>

  )
}

export default BillBox

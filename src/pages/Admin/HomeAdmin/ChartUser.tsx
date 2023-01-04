import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { getUserTypeApi, userType } from '../../../redux/reducers/userReducer'

ChartJS.register(ArcElement, Tooltip)

export default function ChartUser () {
  const { userType, arrUser } = useSelector(
    (state: RootState) => state.userReducer
  )
  const dispatch: AppDispatch = useDispatch()

  const label = () => {
    let labelNew: string[] = []
    userType.map((item: userType, key: number) => {
      labelNew.push(item.tenLoaiNguoiDung)
    })
    return labelNew
  }

  const dataChart = () => {
    let dataArrNew:number[] = [];
    userType.map((item, key) => {
      let found = arrUser.filter(
        (e) => e.maLoaiNguoiDung === item.maLoaiNguoiDung
      );
      dataArrNew.push(found.length);
    });
    return dataArrNew;
  };

  const data = {
    labels: label(),
    datasets: [
      {
        data: dataChart(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      }
    ],
  }

  useEffect(() => {
    dispatch(getUserTypeApi())
  },[])
  return (
    <div className='user-chart paper'>
      <Doughnut data={data} />
    </div>
  )
}

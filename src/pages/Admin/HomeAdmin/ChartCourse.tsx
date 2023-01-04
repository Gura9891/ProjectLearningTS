import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/configStore'
import {
  DanhMuc,
  DanhMucKhoaHoc,
  listCourses
} from '../../../redux/reducers/listCoursesReducer'

ChartJS.register(ArcElement, Tooltip)

export default function ChartCourse () {
  const { arrCourseDirectory, arrayListCourses } = useSelector(
    (state: RootState) => state.listCoursesReducer
  )
  const label = () => {
    let labelNew: string[] = []
    arrCourseDirectory.map((item: DanhMuc, key: number) => {
      labelNew.push(item.tenDanhMuc)
    })
    return labelNew
  }
  const dataChart = () => {
    let dataArrNew: number[] = []
    arrCourseDirectory.map((item: DanhMuc, key: number) => {
      let found = arrayListCourses.filter(
        (e: listCourses) =>
          e.danhMucKhoaHoc.tenDanhMucKhoaHoc === item.tenDanhMuc
      )
      dataArrNew.push(found.length)
    })
    return dataArrNew
  }
  const data = {
    labels: label(),
    datasets: [
      {
        data: dataChart(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='user-chart paper'>
      <Doughnut data={data}  />
    </div>
  )
}

import React from 'react'

const Table = ({hostels}) => {
  return (
    <>
        <div class="p-6 shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" class="px-6 py-3">
                        S/N
                    </th>
                    <th scope="col" class="px-6 py-3">
                        name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Maximum number of rooms
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Number of Rooms
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Gender
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total Occupants
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    hostels.map((hostel, i) => (
                    <tr
                    key={hostel.id} 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4">
                            {i + 1}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {hostel.name}
                        </th>
                        <td class="px-6 py-4">
                            {hostel.max_rooms}
                        </td>
                        <td class="px-6 py-4">
                            {hostel.rooms.length}
                        </td>
                        <td class="px-6 py-4">
                            {hostel.gender}
                        </td>
                        <td class="px-6 py-4">
                            {hostel.total_occupants}
                        </td>
                        <td class="px-6 py-4">
                            <a href="/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                &nbsp;
                            <a href="/" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Table
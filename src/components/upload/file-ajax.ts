/**
 * Created by jiangyukun on 2017/4/19.
 */
import {context} from '../../core/env'

export function uploadFile(file: any, multiple: boolean) {
  const form = new FormData()
  if (!multiple) {
    form.append('file', file)
  } else {
    for (let i = 0; i < file.length; i++) {
      form.append('file', file[i])
    }
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('post', context + '/backend/file/upload', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          const result = eval('(' + xhr.responseText + ')')
        if (result['code'] == 0) {
          let data = result['data']
          let fileList = data.map(item => ({
            fileName: item['file_name'],
            fileUrl: item['file_url'],
          }))
          resolve(fileList)
        }
        reject(result['msg'])
      }
    }
    xhr.send(form)
  })
}

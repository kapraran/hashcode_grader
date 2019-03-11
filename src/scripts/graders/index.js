const graders = {
  '2018/online_qualification': require('./2018/online_qualification').default,
  '2019/online_qualification': require('./2019/online_qualification').default
}

export default function(year, round) {
  return graders[`${year}/${round}`]
}

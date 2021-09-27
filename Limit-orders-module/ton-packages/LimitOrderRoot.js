module.exports = {LimitOrderRootContract:{abi:{"ABI version":2,"header":["time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"codeIndex","type":"cell"},{"name":"codeOrder","type":"cell"},{"name":"codeRouter","type":"cell"},{"name":"rootArr","type":"address[]"}],"outputs":[]},{"name":"deployRouterCallback","inputs":[{"name":"router","type":"address"}],"outputs":[]},{"name":"connectRouterToRoot","inputs":[{"name":"root","type":"address"}],"outputs":[]},{"name":"createOrder","inputs":[{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"},{"name":"amount","type":"uint128"},{"name":"walletOwnerRoot","type":"address"},{"name":"walletOwnerFrom","type":"address"},{"name":"walletOwnerTo","type":"address"}],"outputs":[]},{"name":"cancelOrder","inputs":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint128"},{"name":"walletOwnerRoot","type":"address"},{"name":"walletOwnerFrom","type":"address"}],"outputs":[]},{"name":"resolveCodeHashIndex","inputs":[{"name":"addrRoot","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"}],"outputs":[{"name":"codeHashIndex","type":"uint256"}]},{"name":"resolveIndex","inputs":[{"name":"addrRoot","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"},{"name":"addrOrder","type":"address"}],"outputs":[{"name":"addrIndex","type":"address"}]},{"name":"resolveCodeHash","inputs":[],"outputs":[{"name":"codeHash","type":"uint256"}]},{"name":"resolveOrder","inputs":[{"name":"id","type":"uint256"}],"outputs":[{"name":"addrOrder","type":"address"}]},{"name":"_deployedAddress","inputs":[],"outputs":[{"name":"_deployedAddress","type":"address"}]},{"name":"_deployedRouter","inputs":[],"outputs":[{"name":"_deployedRouter","type":"address"}]}],"data":[],"events":[]},tvc:"te6ccgECLwEACIYAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gssBQQuAtyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4aSHbPNMAAY4SgQIA1xgg+QFY+EIg+GX5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zz4R27yfAsGAUIi0NMD+kAw+GmpOADcIccA3CHXDR/yvCHdAds8+Edu8nwGAzwgghAbGahyu+MCIIIQTLph1rvjAiCCEFsOENW74wIbEAcDPCCCEFXA+2i64wIgghBZlSRTuuMCIIIQWw4Q1brjAg0JCANqMPhCbuMA0//R2zwhjh8j0NMB+kAwMcjPhyDOcc8LYQHIz5NsOENWzs3JcPsAkTDi4wB/+GcrGCAC/DD4Qm7jAPhG8nN/+GbU1NQgxwGT1NHQ3tMf9ARZbwIB0fgnbxCCEBHhowCCECPDRgCCEAvrwgCgtX8jbxC1f6i1f6C1f77y4Gb4ACP4ayL4am34QsjL/3BYgED0Q/gocViAQPQWyPQAySLIz4SA9AD0AM+ByVwg+QDIz4oAQAsKAbbL/8nQWYIQEeGjAIIQI8NGAIIQC+vCAKC1fyZvELV/qLV/oLV/I8jPhQjOAfoCi9AAAAAAAAAAAAAAAAAHzxbMz5BOGNwRAW8iAssf9ADJcPsA+G1fBds8f/hnIAIW7UTQ10nCAYqOgOIrDALYcO1E0PQFiPhqiPhrcPhsjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+G2NCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4boBA9A7yvdcL//hicPhjcPhmLi4D1jD4Qm7jAPpBldTR0PpA3/pBldTR0PpA3/pBldTR0PpA39cNB5XU0dDTB9/XDX+V1NHQ03/f+kGV1NHQ+kDf0ds8IY4fI9DTAfpAMDHIz4cgznHPC2EByM+TVwPtos7NyXD7AJEw4uMAf/hnKw4gAnqNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARfVts8UwLbPPkAcMjPhkDKB8v/ydAyMGxhFQ8ASG1wyMv/cFiAQPRDIXFYgED0Fsj0AMkiyM+EgPQA9ADPgclsIQRQIIIQNipLK7rjAiCCEDq4lXa64wIgghA/UCAGuuMCIIIQTLph1rrjAhkWExEDeDD4Qm7jANHbPCGOKCPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAAzLph1ozxbL/8lw+wCRMOLjAH/4ZysSIAEQcPgo2zz5ADEkA9Yw+EJu4wD6QZXU0dD6QN/6QZXU0dD6QN/6QZXU0dD6QN/XDQeV1NHQ0wff1w1/ldTR0NN/39HbPCGOKCPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAAv1AgBozxbL/8lw+wCRMOLjAH/4ZysUIAEUcF9V2zz5ADFsURUBNiTIziQBziMBziIBywdcy38x+EvQIcnbPDFsUSUDWDD4Qm7jANP/1w1/ldTR0NN/3/pBldTR0PpA3/pBldTR0PpA39HbPNs8f/hnKxcgAWwj2zz4SSHHBfLgZFRxIyP4TsjPhYjOcc8LblUwyM+ROP/q0s7Lf1nIzgHIzs3NzcmAQPsAXwUYAniNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4KNs8UwLbPPkAcMjPhkDKB8v/ydAyMDEkIwMuMPhCbuMA+kGV1NHQ+kDf0ds82zx/+GcrGiAAkPhFIG6SMHDe+EK68uBl+AAgyM+ReKKt4s7JghAF9eEAghAjw0YAoLV/ghAL68IAoLV/+E7Iz4WIzgH6AnHPC2ohzxTJcPsAWwROIIII/1jIuuMCIIIQCKqx9brjAiCCEAwXSCi64wIgghAbGahyuuMCKh8dHAFQMNHbPPhOIY4bjQRwAAAAAAAAAAAAAAAAJsZqHKDIzs7JcPsA3n/4ZysDLjD4Qm7jAPpBldTR0PpA39HbPNs8f/hnKx4gAET4J28QaKb+YKG1f3L7AvhJ+E3HBSCWMCD4TccF3vLgZ/huA7Iw+EJu4wD6QZXU0dD6QN/6QZXU0dD6QN/XDQeV1NHQ0wff1w1/ldTR0NN/39cNf5XU0dDTf9/6QZXU0dD6QN/6QZXU0dD6QN/6QZXU0dD6QN/R2zzbPH/4ZyshIABM+E74TfhM+Ev4SvhG+EP4QsjL/8s/ygDMzMv/WcjOAcjOzc3J7VQD/vgnbxBopv5gobV/cvsC+En4TscF8uBo+CjbPCD4TNs8VHI0VHiaU+/4TvhLU6r5AMjPigBAy/9VoCvIz4WIzxONBJE18bQAAAAAAAAAAAAAAAAAAcDPFszPg1WQyM+QgIs9QszOVXDIzlVgyM7LB8t/y39VIMjOWcjOAcjOzc0kIyIAQM3Nzc3JcPsAMPhMpPhsKcjPhYjOgG/PQMmBAID7AF8KAE5tcMjL/3BYgED0QyHIy/9xWIBA9EPI9ADJIsjPhID0APQAz4HJbCEBGshczjH4StAhyds8MTElAhYhizits1jHBYqK4icmAQgB2zzJKAEmAdTUMBLQ2zzIz44rbNYSzM8RySgBZtWLL0pA1yb0BNMJMSDXSpHUjoDiiy9KGNcmMAHIz4vSkPQAgCDPCwnPi9KGzBLMyM8RzikBBIgBLgFQMNHbPPhNIY4bjQRwAAAAAAAAAAAAAAAAID/WMiDIzs7JcPsA3n/4ZysAUO1E0NP/0z/SANTU0//U0dD6QNTR0PpA0fhu+G34bPhr+Gr4Zvhj+GICCvSkIPShLi0AFHNvbCAwLjQ3LjAAAA==",code:"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"}};
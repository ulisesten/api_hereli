const gost = require('gost-cryptography');
const settings = require('../../core/configuration');
const {d,Q} = gost.ЭЦП.Сгенерировать_ключи();

class EncryptService {
    SECRET = settings.getSecretKey();

    /**
     * @param data string
     * @return firma
     * */

    sign( data ) {
        ///    gost.EDS.firmar
        return gost.ЭЦП.Подписать(
            data, d
        )
    }


    /**
     * @param data string datos sin cifrar
     * @param signature string datos cifrados
     * @return bool
     * */

    verify( data, signature ) {
        ///     gost.EDS.comprobar
        return gost.ЭЦП.Проверить(
            data, signature,  Q
        );
    }


    /**
     * @brief Encripta con posibilidad de revertir
     * @param data any
     * */

    reversible_encrypt( data ) {
        ///    gost.encriptacion.proceso_con_reversion
        return gost.Шифрование.Гаммование_с_обратной_связью(
            JSON.stringify(data), this.SECRET, null, null, false
        );
    }


    /**
     * @param texto_cifrado string
     * @return string texto descifrado
     * */

    decrypt( texto_cifrado ) {
        ///    gost.encriptacion.proceso_con_reversion
        return gost.Шифрование.Гаммование_с_обратной_связью(
            texto_cifrado,this.SECRET, null, null, true
        );
    }


    /**
     * @param data string
     * @return string
     * */

    hash( data ) {
        ///    gost.hash.calcular
        return gost.Хэшевание.Вычислить(
            data, false
        );
    }
}


module.exports = new EncryptService();